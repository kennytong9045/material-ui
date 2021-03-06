import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, lighten, darken } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { capitalize } from '@material-ui/core/utils';
import { useThemeVariants } from '@material-ui/styles';
import SuccessOutlinedIcon from '../internal/svg-icons/SuccessOutlined';
import ReportProblemOutlinedIcon from '../internal/svg-icons/ReportProblemOutlined';
import ErrorOutlineIcon from '../internal/svg-icons/ErrorOutline';
import InfoOutlinedIcon from '../internal/svg-icons/InfoOutlined';
import CloseIcon from '../internal/svg-icons/Close';

export const styles = (theme) => {
  const getColor = theme.palette.mode === 'light' ? darken : lighten;
  const getBackgroundColor = theme.palette.mode === 'light' ? lighten : darken;

  return {
    /* Styles applied to the root element. */
    root: {
      ...theme.typography.body2,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'transparent',
      display: 'flex',
      padding: '6px 16px',
    },
    /* Styles applied to the root element if `variant="filled"`. */
    filled: {},
    /* Styles applied to the root element if `variant="outlined"`. */
    outlined: {},
    /* Styles applied to the root element if `variant="standard"`. */
    standard: {},
    /* Styles applied to the root element if `variant="standard"` and `color="success"`. */
    standardSuccess: {
      color: getColor(theme.palette.success.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.success.main, 0.9),
      '& $icon': {
        color: theme.palette.success.main,
      },
    },
    /* Styles applied to the root element if `variant="standard"` and `color="info"`. */
    standardInfo: {
      color: getColor(theme.palette.info.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.info.main, 0.9),
      '& $icon': {
        color: theme.palette.info.main,
      },
    },
    /* Styles applied to the root element if `variant="standard"` and `color="warning"`. */
    standardWarning: {
      color: getColor(theme.palette.warning.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.warning.main, 0.9),
      '& $icon': {
        color: theme.palette.warning.main,
      },
    },
    /* Styles applied to the root element if `variant="standard"` and `color="error"`. */
    standardError: {
      color: getColor(theme.palette.error.main, 0.6),
      backgroundColor: getBackgroundColor(theme.palette.error.main, 0.9),
      '& $icon': {
        color: theme.palette.error.main,
      },
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="success"`. */
    outlinedSuccess: {
      color: getColor(theme.palette.success.main, 0.6),
      border: `1px solid ${theme.palette.success.main}`,
      '& $icon': {
        color: theme.palette.success.main,
      },
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="info"`. */
    outlinedInfo: {
      color: getColor(theme.palette.info.main, 0.6),
      border: `1px solid ${theme.palette.info.main}`,
      '& $icon': {
        color: theme.palette.info.main,
      },
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="warning"`. */
    outlinedWarning: {
      color: getColor(theme.palette.warning.main, 0.6),
      border: `1px solid ${theme.palette.warning.main}`,
      '& $icon': {
        color: theme.palette.warning.main,
      },
    },
    /* Styles applied to the root element if `variant="outlined"` and `color="error"`. */
    outlinedError: {
      color: getColor(theme.palette.error.main, 0.6),
      border: `1px solid ${theme.palette.error.main}`,
      '& $icon': {
        color: theme.palette.error.main,
      },
    },
    /* Styles applied to the root element if `variant="filled"` and `color="success"`. */
    filledSuccess: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.success.main,
    },
    /* Styles applied to the root element if `variant="filled"` and `color="info"`. */
    filledInfo: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.info.main,
    },
    /* Styles applied to the root element if `variant="filled"` and `color="warning"`. */
    filledWarning: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.warning.main,
    },
    /* Styles applied to the root element if `variant="filled"` and `color="error"`. */
    filledError: {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: theme.palette.error.main,
    },
    /* Styles applied to the icon wrapper element. */
    icon: {
      marginRight: 12,
      padding: '7px 0',
      display: 'flex',
      fontSize: 22,
      opacity: 0.9,
    },
    /* Styles applied to the message wrapper element. */
    message: {
      padding: '8px 0',
    },
    /* Styles applied to the action wrapper element if `action` is provided. */
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: 16,
      marginRight: -8,
    },
  };
};

const defaultIconMapping = {
  success: <SuccessOutlinedIcon fontSize="inherit" />,
  warning: <ReportProblemOutlinedIcon fontSize="inherit" />,
  error: <ErrorOutlineIcon fontSize="inherit" />,
  info: <InfoOutlinedIcon fontSize="inherit" />,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  const {
    action,
    children,
    classes,
    className,
    closeText = 'Close',
    color,
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = 'alert',
    severity = 'success',
    variant = 'standard',
    ...other
  } = props;

  const themeVariantsClasses = useThemeVariants(
    {
      ...props,
      closeText,
      iconMapping,
      role,
      severity,
      variant,
    },
    'MuiAlert',
  );

  return (
    <Paper
      role={role}
      square
      elevation={0}
      className={clsx(
        classes.root,
        classes[variant],
        classes[`${variant}${capitalize(color || severity)}`],
        themeVariantsClasses,
        className,
      )}
      ref={ref}
      {...other}
    >
      {icon !== false ? (
        <div className={classes.icon}>
          {icon || iconMapping[severity] || defaultIconMapping[severity]}
        </div>
      ) : null}
      <div className={classes.message}>{children}</div>
      {action != null ? <div className={classes.action}>{action}</div> : null}
      {action == null && onClose ? (
        <div className={classes.action}>
          <IconButton
            size="small"
            aria-label={closeText}
            title={closeText}
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ) : null}
    </Paper>
  );
});

Alert.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: PropTypes.node,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon: PropTypes.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: PropTypes.shape({
    error: PropTypes.node,
    info: PropTypes.node,
    success: PropTypes.node,
    warning: PropTypes.node,
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined', 'standard']),
    PropTypes.string,
  ]),
};

export default withStyles(styles, { name: 'MuiAlert' })(Alert);
