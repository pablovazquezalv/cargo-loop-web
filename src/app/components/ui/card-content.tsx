export default function CardContent({
    children,
    className,
    ...props
    }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
        className={`p-6 ${className}`}
        {...props}
        >
        {children}
        </div>
    );
    }