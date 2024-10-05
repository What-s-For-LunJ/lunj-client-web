import * as React from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & MotionProps;
interface CardProps extends MotionDivProps {
  backgroundImage?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, backgroundImage, style, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
      {...props}
    />
  )
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-0 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardDetail = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, backgroundImage, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm p-4 my-4 flex justify-center items-center m-4", // Added margin class
        className
      )}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(10px)", // Frosted glass effect
        backgroundColor: "rgba(10, 9, 9, 0.18)", // Semi-transparent background
        border: "1px solid rgba(255, 255, 255, 0.3)", // Lighter border for the glassy look
        width: "35%",  // Auto width
        height: "3px",  // Adjust height to accommodate text
        ...style,
      }}
      {...props}
    />
  )
);
Card.displayName = "CardDetail";

const CardOffer = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, backgroundImage, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm p-4 my-4 flex justify-center items-center", // Flex to center items
        className
      )}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(5px)", // Frosted glass effect
        backgroundColor: "rgba(255, 0, 0, 0.2)", // Semi-transparent background
        border: "1px solid rgba(255, 255, 255, 0.3)", // Lighter border for the glassy look
        width: "15%",  // Width for the card
        height: "5px", // Adjust height to accommodate content
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
);

CardOffer.displayName = "CardOffer";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardDetail,
  CardOffer,
};
