
import classNames from "classnames";
import { FC, ReactNode } from "react";


type Props = {
    id?: string;
    children?: ReactNode;
    className?: string;
    gray?: boolean;
};


const FullPageContainer: FC<Props> = ({ id, children, className, gray }) => {
    return (
        <div id={id} className={classNames({
            "w-full h-full min-h-[100dvh] max-h-full": true,
            [`${className}`]: true && className,
            "bg-gray-light": gray == true,
            "bg-white": !gray,
        })} >
            <div className="h-full flex flex-col">
                {children}
            </div>
        </div >
    )
}


export default FullPageContainer;