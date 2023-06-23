export interface BaseProps {
    require?: (isRequire: any) => boolean;
    iconProps?: any;
    error?: any;
    containerStyle?: any;
    placeholder?: string;
    value?: any;
    disable?: boolean;
    leftComponent?: (valueIsNotEmpty: any, iconStyles: any) => any;
    rightComponent?: (iconStyles: any) => any;
    onRightComponentPress?: () => void;
}
