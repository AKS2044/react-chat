import { useEffect, useState } from "react";
import { Severity } from "../../../enum/EnumSeverity";
import cl from "./Alert.module.scss";
import successIcon from "../../../images/accept.svg";
import errorIcon from "../../../images/error.svg";

type AlertProps = {
    children: any,
    severity?: string,
    classes?: string
}

type CssProps = {
    border: string,
    background: string,
    imgIcon: any
}

const Alert = ({children, severity, classes}: AlertProps) => {
    const [style, setStyle] = useState<CssProps>();
    
    useEffect(() => {
        switch (severity) {
            case Severity.success:{
                const successStyle: CssProps = {border: '2px solid #239328', background: '#0d310e', imgIcon: successIcon};
                setStyle(successStyle)
                break;}

            case Severity.error:{
                const successStyle: CssProps = {border: '2px solid #932323', background: '#310d0d', imgIcon: errorIcon};
                setStyle(successStyle)
                break;}
            default:
                break;
        }
        }, [severity]);
    return (
        <div style={{background: style?.background, border: style?.border}}  className={`${cl.alert} ${classes}`}>
            <img className={cl.alert__icon} src={style?.imgIcon} alt='icon'>
            </img>
            {children}
        </div>
    );
};

export default Alert;