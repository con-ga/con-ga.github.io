<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/root">
        (<xsl:apply-templates/>)
    </xsl:template>
    <xsl:template match="dir">
    	<xsl:apply-templates select=".|@*"/>
    </xsl:template>
    <xsl:template match="@name">
    	<xsl:value-of select="."/>
    </xsl:template>
</xsl:stylesheet>