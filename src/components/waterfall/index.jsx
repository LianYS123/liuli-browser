import classNames from 'clsx';

export const WaterfallItem = ({ children, ...rest }) => {
  return (
    <li {...rest} className="waterfall-item">
      {children}
    </li>
  );
};

export const Waterfall = ({
  className,
  children,
  columnCount = 2,
  style = {}
}) => {
  return (
    <ul
      style={{ columnCount, ...style }}
      className={classNames(className, "waterfall-wrapper")}
    >
      {children}
    </ul>
  );
};

Waterfall.Item = WaterfallItem;
