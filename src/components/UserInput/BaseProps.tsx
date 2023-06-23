export interface BaseProps {
    require?: (isRequire: any) => boolean;
    iconProps?: any;
    error?: any;
    containerStyle?: {};
    placeholder?: string;
    value?: any;
    disable?: boolean;
    leftComponent?: (valueIsNotEmpty: any, iconProps: any, disable: any) => any;
    rightComponent?: (iconProps: any) => any;
    onRightComponentPress?: () => void;
}
