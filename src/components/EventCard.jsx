import React from "react";
import { Box, Badge, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEventContext } from "../context/EventContext";

export const EventCard = ({ event }) => {
  const { categories } = useEventContext();

  // Function to get category name from category id
  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);

    return category ? category.name : "Unknown Category";
  };

  return (
    <Link to={`/event/${event.id}`} style={{ textDecoration: "none" }}>
      <Box
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg="white"
        transition="transform 0.3s"
        _hover={{ transform: "scale(1.02)" }}
      >
        <Image src={event.image} alt="event image" minHeight="200px" />

        <Box p="4" minHeight="200px" display="flex" flexDirection="column">
          <Box>
            <Badge borderRadius="full" px="2" colorScheme="teal" mb="2">
              {event.categoryIds &&
                event.categoryIds.map((categoryId) => {
                  const category = categories.find(
                    (category) => category.id === categoryId
                  );
                  return (
                    <span key={categoryId} style={{ marginRight: "10px" }}>
                      {category?.name || "Unknown Category"}
                    </span>
                  );
                })}
            </Badge>

            <Text
              color="gray.600"
              fontSize="sm"
              fontWeight="semibold"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              {new Date(event.startTime).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Box>

          <Box flex="1">
            <Heading
              color="gray.800"
              fontSize="lg"
              fontWeight="bold"
              noOfLines={2}
              mt="2"
            >
              {event.title}
            </Heading>

            <Text color="gray.600" fontSize="sm" mt="2">
              {event.description.substring(0, 100)}
              {event.description.length > 100 && "..."}
            </Text>
          </Box>

          <Text
            color="gray.600"
            fontSize="sm"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
            mt="2"
          >
            Event End:{" "}
            {new Date(event.endTime).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};
