import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  ListItem,
  UnorderedList,
  Text,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, NavLink } from "react-router-dom";
import logo from "./allog.png";
import { ClassNames } from "@emotion/react";
{
  /* Contact for web development at gamil : sameemTheDevTech@gmail.com 
  At WhatsApp : +923480630652 
  Thanks */
}
export const Navigation = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [clicked, setClicked] = useState(true);
  let [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
    setFilteredEvents(
      events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [clicked]);

  const fetchLatest = () => {
    setClicked(!clicked);
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      const eventData = await response.json();
      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const randomQuote = () => {
    const quotes = [
      "Embrace an active life and unlock your true potential.",
      "Discover the joy of living an active lifestyle.",
      "Elevate your life through fitness and adventure.",
      "Experience the magic of an active life.",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <>
      <Box bgGradient="linear(to-r, teal.400, teal.500)" p={4}>
        <Flex justify="space-between" align="center" wrap="wrap">
          <Flex alignItems="baseline">
            <Image
              src={logo}
              alt="Logo"
              width={100}
              height={100}
              style={{ marginRight: "8px" }}
            />
            <Link
              to="/"
              as={NavLink}
              style={{
                color: "white",
                textDecoration: "none",
                fontFamily: "Logirent Demo",
                fontSize: "50px",
                fontWeight: "bolder",
                paddingBottom: "5px",
              }}
            >
              Ev<span style={{ color: "#a200ea" }}>ent</span> A
              <span style={{ color: "#a200ea" }}>pp</span>
            </Link>
          </Flex>
          <Box
            textAlign={{ base: "center", md: "right" }}
            maxWidth="600px"
            mt={{ base: 4, md: 0 }}
            ml={{ base: "auto", md: 4 }}
          >
            <Text color="white" fontStyle="italic" mt={{ base: 2, md: 0 }}>
              {randomQuote()}
            </Text>
          </Box>
        </Flex>
        <Box padding={0} mt={4} bg="teal.400">
          <Menu p={4}>
            <MenuButton
              color="gray.100"
              fontSize={20}
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
            >
              <IconButton
                icon={<HamburgerIcon />}
                aria-label="Open Menu"
                size="sm"
                color="gray.500"
                mr={2}
                ml={5}
              ></IconButton>
              Events
            </MenuButton>
            <MenuList bg="teal.600">
              {filteredEvents.map((event) => (
                <MenuItem
                  bg="teal.600"
                  key={event.id}
                  my={2}
                  as={NavLink}
                  to={`/event/${event.id}`}
                >
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    color="teal.100"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {event.title}
                  </Text>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};
