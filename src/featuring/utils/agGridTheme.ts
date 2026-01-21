import { themeQuartz, iconSetMaterial } from 'ag-grid-community';

// Shared AG Grid Theme
export const customAgGridTheme = themeQuartz
    .withPart(iconSetMaterial)
    .withParams({
        accentColor: "#5E51FF",
        backgroundColor: "#FFFFFF",
        borderColor: "#F0F0F0",
        borderRadius: 3,
        browserColorScheme: "light",
        cellHorizontalPaddingScale: 0.7,
        chromeBackgroundColor: {
            ref: "backgroundColor"
        },
        columnBorder: true,
        fontFamily: {
            googleFont: "Inter"
        },
        fontSize: 12,
        foregroundColor: "#555B62",
        headerBackgroundColor: "#FFFFFF",
        headerFontSize: 13,
        headerFontWeight: 400,
        headerRowBorder: true,
        headerTextColor: "#84868B",
        iconSize: 14,
        rowBorder: true,
        rowVerticalPaddingScale: 0.8,
        sidePanelBorder: true,
        spacing: 6,
        wrapperBorder: true,
        wrapperBorderRadius: 4
    });
