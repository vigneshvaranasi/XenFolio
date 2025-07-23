type ButtonProps = {
    text: string,
    onClick?: any,
    className?: string,
    variant: 'danger' | 'warning' | 'primary' | 'success' | 'secondary',
    disabled?: boolean,
}

const variantClasses = {
    danger: 'text-[#EC5959] bg-[#EC595912] border-[#EC5959] hover:shadow-[0_0_10px_#EC5959]',
    warning: 'text-[#ECB659] bg-[#ECB65912] border-[#ECB659] hover:shadow-[0_0_10px_#ECB659]',
    primary: 'text-[#5976EC] bg-[#5976EC12] border-[#5976EC] hover:shadow-[0_0_10px_#5976EC]',
    success: 'text-[#24930F] bg-[#24930F12] border-[#24930F] hover:shadow-[0_0_10px_#24930F]',
    secondary: 'text-[#535353] bg-[#53535312] border-[#535353] hover:shadow-[0_0_10px_#535353]',
};

const defaultClasses='text-lg rounded-md px-2.5 border hover:backdrop-brightness-50 hover:drop-shadow-2xl transition duration-300'

const Button = ({ text, variant, className, onClick }: ButtonProps) => {
    return (
        <button className={`${className}  ${variantClasses[variant]} ${defaultClasses}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}
export default Button