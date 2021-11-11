import './nexusButton.css'

const NexusButton = ({
    icon,
    filled,
    onClick,
    children
}) => {
    const Icon = icon;
    return (
        <div className={"button-container"}>
            <Icon/>
            {children}
        </div>
    )
}

export default NexusButton;