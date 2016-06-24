# -*- coding: utf-8 -*-
# ---------------------------------------------------------------------------
# to_python.py
# Created on: 2016-04-21 21:32:46.00000
#   (generated by ArcGIS/ModelBuilder)
# Description: Script to generate SF affordability hex bins
# Project 22505, years 2000 - 2015
# ---------------------------------------------------------------------------

# Import arcpy module, set environments
import arcpy
import os
from arcpy import env
arcpy.env.overwriteOutput = True
arcpy.env.workspace = r"E:\Active Projects\22505_PHC_Housing_Affordability_Tool\data\raw\taxlots"
arcpy.env.qualifiedFieldNames = False

#Output workspace
SF_gdb = r"E:\Active Projects\22505_PHC_Housing_Affordability_Tool\data\geodatabase\SF_afford_520.gdb"


#Create variable tlist containing a list of all tax lot features
tlist = arcpy.ListFeatureClasses()

#Loop through tax lot features and export SF taxlots that meet criteria
for t in tlist:
    year = str(t[10:12])
    print(year)
    taxlot = "layer_%s" % year
    arcpy.MakeFeatureLayer_management(t, taxlot)
    
    #Add field Sale Year
    #arcpy.AddField_management(taxlot, "SLYR"+year, "SHORT", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    
    #Select by attribute where Sale Date exists
    #arcpy.SelectLayerByAttribute_management(taxlot, "NEW_SELECTION", "NOT \"SALEDATE\" = ' '")
    
    #Calculate field Sale Year
    #arcpy.CalculateField_management(taxlot, "SLYR"+year, "LEFT([SALEDATE],4)", "VB", "")
    
    #Select by attribute where SF property code, within sale price range, and sale year = current year
    where1 = '"SLYR%s"=20%s AND "PROP_CODE" IN (\'101\', \'102\', \'122\', \'141\') AND "SALEPRICE">= 75000 AND "SALEPRICE"< 3000000' % (year, year)
    arcpy.SelectLayerByAttribute_management(taxlot, "NEW_SELECTION", where1)
    
    #Select by location where intersects hex bins within the UGB
    arcpy.SelectLayerByLocation_management(taxlot, "INTERSECT", os.path.join(SF_gdb,"hex_bins_in_UGB"), "", "SUBSET_SELECTION", "NOT_INVERT")
    
    #Join SF affordability assumptions for each year and export
    arcpy.AddJoin_management(taxlot, "SLYR"+year, os.path.join(SF_gdb,"SF"), "JoinYear")
    arcpy.CopyFeatures_management(taxlot,os.path.join(SF_gdb,"SF_20"+year))
    

# Now working with outputs in geodatabase; change working environment
arcpy.env.workspace = SF_gdb

#Remove any layers that don't begin with "SF" from sflist
sflist = arcpy.ListFeatureClasses()
print(sflist)
for x in sflist:
    if x[:2] != 'SF':
        sflist.remove(x)        
print(sflist)

#Loop through sflist and calculate affordability fields
for s in sflist:
    year = str(s[-2:])
    print(year)
    print(s)
    # Process: Add Field Mortgage 5%
    arcpy.AddField_management(s, "Mort5_"+year, "DOUBLE", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field Mortgage 5%
    arcpy.CalculateField_management(s, "Mort5_"+year, "(([intrst_rate] / 12) * ( [SALEPRICE] *0.95)) / (1 - ((1 + ( [intrst_rate] / 12)) ^ (-30 * 12)))", "VB", "")

    # Process: Add Field Mortgage 20%
    arcpy.AddField_management(s, "Mort20_"+year, "DOUBLE", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field Mortgage 20%
    arcpy.CalculateField_management(s, "Mort20_"+year, "(([intrst_rate] / 12) * ( [SALEPRICE] *0.8)) / (1 - ((1 + ( [intrst_rate] / 12)) ^ (-30 * 12)))", "VB", "")

    # Process: Add Field Property Tax
    arcpy.AddField_management(s, "ptax_"+year, "DOUBLE", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field Property Tax
    arcpy.CalculateField_management(s, "ptax_"+year, "[SALEPRICE] * [cha_pratio] * 0.02", "VB", "")

    # Process: Add Field Insurance
    arcpy.AddField_management(s, "insur_"+year, "DOUBLE", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field (5)
    arcpy.CalculateField_management(s, "insur_"+year, "[SALEPRICE] / 1000 * 3.5", "VB", "")

    # Process: Add Field PMI (5% mortgages)
    arcpy.AddField_management(s, "PMI5_"+year, "DOUBLE", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field (PMI)
    arcpy.CalculateField_management(s, "PMI5_"+year, "([SALEPRICE] - ([Mort5_"+year+"]*12)) * 0.01", "VB", "")

    # Process: Add Field Total Payment 5%
    arcpy.AddField_management(s, "totpy5_"+year, "DOUBLE", "", "", "", "","NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field Total Payment 5%
    arcpy.CalculateField_management(s, "totpy5_"+year, "([Mort5_"+year+"] * 12)+([utilities] * 12) + [ptax_"+year+"] + [insur_"+year+"]+[PMI5_"+year+"]", "VB", "")

    # Process: Add Field Total Payment 20%
    arcpy.AddField_management(s, "totpy20_"+year, "DOUBLE", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field Total Payment 20%
    arcpy.CalculateField_management(s, "totpy20_"+year, "([Mort20_"+year+"] * 12)+([utilities] * 12) + [ptax_"+year+"] + [insur_"+year+"]", "VB", "")

    # Process: Add Field Affordability 5%
    arcpy.AddField_management(s, "affd5_"+year, "DOUBLE", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field Affordability 5%
    arcpy.CalculateField_management(s, "affd5_"+year, "[totpy5_"+year+"] / [hud_mfi]", "VB", "")

    # Process: Add Field Affordability 20%
    arcpy.AddField_management(s, "affd20_"+year, "DOUBLE", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field Affordability 20%
    arcpy.CalculateField_management(s, "affd20_"+year, "[totpy20_"+year+"] / [hud_mfi]", "VB", "")

#Spatial join to hex bins
    targetFeature = os.path.join(SF_gdb,"hex_bins_in_UGB")
    arcpy.SpatialJoin_analysis(tarpringetFeature, s, os.path.join(SF_gdb,"hex_SF_afford_20"+year), "JOIN_ONE_TO_ONE", "KEEP_ALL", "ID \"ID\" true true false 8 Double 0 0 ,First,#,"+targetFeature+",ID,-1,-1;SALEPRICE \"SP"+year+"\" true true false 4 Long 0 0 ,Median,#,"+s+",SALEPRICE,-1,-1;SLYR"+year+" \"SLYR"+year+"\" true true false 2 Short 0 0 ,First,#,"+s+",SLYR"+year+",-1,-1;intrst_rate \"intrst_"+year+"\" true true false 8 Double 0 0 ,First,#,"+s+",intrst_rate,-1,-1;hud_mfi \"hudmfi"+year+"\" true true false 8 Double 0 0 ,First,#,"+s+",hud_mfi,-1,-1;affd5_"+year+" \"affd5_"+year+"\" true true false 8 Double 0 0 ,Median,#,"+s+",affd5_"+year+",-1,-1;affd20_"+year+" \"affd20_"+year+"\" true true false 8 Double 0 0 ,Median,#,"+s+",affd20_"+year+",-1,-1", "INTERSECT", "", "")
    # Process: Add Field Number of Sales (from Join count)
    arcpy.AddField_management(os.path.join(SF_gdb,"hex_SF_afford_20"+year), "numSls"+year, "SHORT", "", "", "", "", "NULLABLE", "NON_REQUIRED", "")
    # Process: Calculate Field Number of Sales (from Join count)
    arcpy.CalculateField_management(os.path.join(SF_gdb,"hex_SF_afford_20"+year), "numSls"+year, "[Join_Count]", "VB", "")
    
#Remove any layers that don't begin with "SF" from sflist
featureList = arcpy.ListFeatureClasses()
hexlist = []

print(featureList)
for x in featureList:
    year = str(x[-2:])
    if x[:6] == 'hex_SF' and year != '00':
        hexlist.append(x)

print(hexlist)

arcpy.MakeFeatureLayer_management(os.path.join(SF_gdb,"hex_SF_afford_2000"), "hexlayer_2000")

for h in hexlist:
    year = str(h[-2:])
    print(year)
    #Join hex bins for every year to 2000 hex bins
    arcpy.JoinField_management("hexlayer_2000", "ID", h, "ID")
    
    
#arcpy.MakeFeatureLayer_management(h, "hexlayer_20"+year)   
#arcpy.AddJoin_management("hexlayer_20"+year, "ID", hexlist[hexlist.index(h)+1], "ID","KEEP_ALL")
arcpy.CopyFeatures_management("hexlayer_2000",os.path.join(SF_gdb,"SF_affordability_hex_2000_2015"))

