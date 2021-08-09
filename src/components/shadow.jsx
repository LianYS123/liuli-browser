import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";
import { useHover } from "react-use";

const useStyles = makeStyles({
  root: {
    position: "relative",
    "& .shadow-enter": {
      opacity: 0,
      transform: "scale(0.9)",
    },
    "& .shadow-enter-active": {
      opacity: 1,
      transform: "translateX(0)",
      transition: "opacity 300ms, transform 300ms",
    },
    "& .shadow-exit": {
      opacity: 1,
    },
    "& .shadow-exit-active": {
      opacity: 0,
      transform: "scale(0.9)",
      transition: "opacity 300ms, transform 300ms",
    },
  },
  inner: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,.5)",
  },
});

export const Shadow = ({ children, className, overlay, ...rest }) => {
  const classes = useStyles();
  const [element, isHovering] = useHover((isHovering) => (
    <div className={clsx(classes.root, className)} {...rest}>
      <CSSTransition timeout={300} classNames="shadow" in={isHovering} unmountOnExit={true}>
        <div className={classes.inner}>{overlay}</div>
      </CSSTransition>
      {children}
    </div>
  ));
  return element;
};
