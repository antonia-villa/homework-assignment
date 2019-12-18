import React, { useState } from "react";
// Material UI Components
import {
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  IconButton,
  Input,
  InputAdornment
} from "@material-ui/core";
// Material UI Icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// NOTE: Enables temporary auth as proof of concept
import { SAMPLE_DATA } from "../static/data/sample-data";
import { THEME } from "../utils/theme";
import { ADMIN, DATA_ATTRIBUTES } from "../utils/constants";

const useStyles = makeStyles(theme => ({
  formWrapper: {
    marginTop: "25%",
    display: "flex",
    flexDirection: "column",
    fontSize: "24px",
    backgroundColor: THEME.MAIN.DARK,
    color: THEME.LIGHTEST,
    marginLeft: "25%",
    marginRight: "25%",
    borderRadius: "8px"
  },
  formContent: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    color: THEME.LIGHTEST
  },
  formControl: {
    marginBottom: "20px",
    minWidth: 260,
    fontSize: "20px"
  },
  inputLabel: {
    fontSize: "20px",
    marginBottom: "20px",
    marginTop: "-10px",
    color: THEME.LIGHTEST
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  menuItem: {
    fontSize: "18px"
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 200
  },
  selectList: {
    marginTop: "10px",
    fontSize: "20px",
    color: THEME.LIGHTEST
  },
  passwordIcon: {
    color: THEME.LIGHTEST
  },
  submitButton: {
    backgroundColor: THEME.LIGHT,
    color: THEME.MAIN.DARK,
    fontSize: "20px",
    marginLeft: "25%",
    marginRight: "25%",
    "&:hover": {
      backgroundColor: THEME.SECONDARY.LIGHT
    }
  }
}));

const CLIENT = "client";
const PASSWORD = "password";

const Login = props => {
  const classes = useStyles();

  const [values, setValues] = useState({
    client: "",
    password: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // This is a hacked implementation of auth
  // Only relevant data for each individual client should be displayed upon log in
  const CLIENT_LIST = [
    ...new Set(SAMPLE_DATA.map(record => record[DATA_ATTRIBUTES.CLIENT_NAME]))
  ];
  // Admin login is reserved for the forwarder
  CLIENT_LIST.unshift(ADMIN);

  return (
    <div className={classes.formWrapper}>
      <div className={classes.formContent}>
        <FormControl className={classes.formControl} variant="standard">
          <InputLabel className={classes.inputLabel}>Select Client</InputLabel>
          <Select
            className={classes.selectList}
            value={values.client}
            onChange={handleChange(CLIENT)}
          >
            {CLIENT_LIST.map(client => (
              <MenuItem
                key={client}
                className={classes.menuItem}
                value={client}
              >
                {client}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.inputLabel}>Password</InputLabel>
          <Input
            type={values.showPassword ? "text" : PASSWORD}
            value={values.password}
            className={classes.inputLabel}
            onChange={handleChange(PASSWORD)}
            endAdornment={
              <InputAdornment position="end" className={classes.passwordIcon}>
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  className={classes.passwordIcon}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(values.client, values.password)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
export default Login;
