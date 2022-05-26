import { Tab, Tabs } from "@material-ui/core";
import React, { Fragment, memo } from "react";
import PropTypes from "prop-types";
import { EmojiTabsContainer } from "./styled";
import { EmojiPicker } from "./EmojiPicker";
import SwipeableViews from "react-swipeable-views";

export const EmojiBar = ({ setMessage, message }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
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
        <Tab style={{ minWidth: "100px" }} label="stickers" disabled />
        <Tab style={{ minWidth: "100px" }} label="gifs" disabled />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0}>
          <EmojiPicker setMessage={setMessage} message={message} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Стикеры
        </TabPanel>
        <TabPanel value={value} index={2}>
          Гифки
        </TabPanel>
      </SwipeableViews>
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
