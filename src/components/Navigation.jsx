import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  ListItem,
  UnorderedList,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import logo from "./allog.png";

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
    <Box bgGradient="linear(to-r, teal.400, teal.500)" p={4}>
      <Flex justify="space-between" align="center" wrap="wrap">
        <Flex alignItems="center">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={150}
            style={{ marginRight: "8px", padding: "8px" }}
          />
          <Link
            to="/"
            as={NavLink}
            style={{ color: "white", textDecoration: "none" }}
          >
            <Heading
              color="white"
              size="3xl"
              fontWeight="medium"
              mt={{ base: 2, md: 0 }}
              textAlign={{ base: "center", md: "left" }}
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
              onClick={fetchLatest}
            >
              EventApp
            </Heading>
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
      <Box bg="teal.400" p={4}>
        <UnorderedList color="gray.500" listStyleType="none" padding={0} mt={4}>
          {filteredEvents.map((event) => (
            <ListItem key={event.id} my={2}>
              <Link to={`/event/${event.id}`} as={NavLink}>
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  color="teal.100"
                  _hover={{ textDecoration: "underline" }}
                >
                  {event.title}
                </Text>
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
};
