import { Tab, Tabs } from "@material-ui/core";
import React, { Fragment, memo } from "react";
import PropTypes from "prop-types";
import { EmojiTabsContainer } from "./styled";
import { EmojiPicker } from "./EmojiPicker";
export const EmojiBar = ({ setMessage, message }) => {
  console.log(message, "123123");
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <EmojiTabsContainer>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="standard"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab style={{ minWidth: "100px" }} label="emoji" />
        <Tab style={{ minWidth: "100px" }} label="stickers" />
        <Tab style={{ minWidth: "100px" }} label="gifs" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EmojiPicker setMessage={setMessage} message={message} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Стикеры
      </TabPanel>
      <TabPanel value={value} index={2}>
        Гифки
      </TabPanel>
    </EmojiTabsContainer>
  );
};

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Fragment
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Fragment> {children}</Fragment>}
    </Fragment>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
