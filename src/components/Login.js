import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Material UI Components
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
// Material UI Icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// NOTE: Enables temporary auth as proof of concept
import { SAMPLE_DATA } from "../static/data/sample-data";
import { THEME } from "../utils/theme";

const useStyles = makeStyles(theme => ({
  formWrapper: {
    marginTop: "25%",
    display: "flex",
    flexDirection: "column",
    fontSize: "24px",
    backgroundColor: THEME.LIGHT,
    marginLeft: "25%",
    marginRight: "25%"
  },
  formContent: {
    padding: "24px",
    display: "flex",
    flexDirection: "column"
  },
  formControl: {
    marginBottom: "20px",
    minWidth: 260,
    fontSize: "20px"
  },
  inputLabel: {
    fontSize: "20px",
    marginBottom: "20px",
    marginTop: "-10px"
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
    fontSize: "14px"
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 200
  },
  selectList: {
    marginTop: "10px",
    fontSize: "20px"
  },
  submitButton: {
    backgroundColor: THEME.MAIN.DARK,
    color: THEME.LIGHT,
    fontSize: "20px",
    marginLeft: "25%",
    marginRight: "25%"
  }
}));

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
  // Given the client specific data, only relevant data for each individual client should be displayed upon log in
  const CLIENT_LIST = [
    ...new Set(SAMPLE_DATA.map(record => record["Client Name"]))
  ];

  return (
    <div className={classes.formWrapper}>
      <div className={classes.formContent}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.inputLabel}>Select Company</InputLabel>
          <Select
            className={classes.selectList}
            value={values.client}
            onChange={handleChange("client")}
          >
            {CLIENT_LIST.map(client => (
              <MenuItem className={classes.menuItem} value={client}>
                {client}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.inputLabel}>Password</InputLabel>
          <Input
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            className={classes.inputLabel}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
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
