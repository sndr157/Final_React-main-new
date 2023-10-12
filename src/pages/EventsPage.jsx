import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Badge,
  Flex,
  Button,
  Select,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom/dist";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import AddEvent from "./AddEvent";

const NewEventModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleAddEvent = async (eventData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) {
        throw new Error("Failed to add event");
      }
      onClose();
      toast({
        title: "Event added.",
        description: "Your new event has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        title: "Error adding event.",
        description: "Something went wrong while adding your event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a New Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddEvent
            onClose={onClose}
            onAddEvent={handleAddEvent}
            loading={loading}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// Utility function to get category name based on categoryIds
const getCategoryName = (categoryIds, categories) => {
  return categories
    .filter((category) => categoryIds.includes(category.id))
    .map((category) => category.name);
};

export const EventsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEvents = async () => {
    const url = `http://localhost:3000/events${
      selectedCategory ? `?category=${selectedCategory}` : ""
    }${searchTerm ? (selectedCategory ? "&" : "?") + `q=${searchTerm}` : ""}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, [searchTerm, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredEvents = events.filter(
    (event) =>
      !selectedCategory || event.categoryIds.includes(Number(selectedCategory))
  );

  return (
    <Box p={4}>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        bgGradient="linear(to-b, yellow.300, teal.300)"
        clipPath="ellipse(70% 100% at 50% 0%)"
        transform="rotate(-3deg)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        bgGradient="linear(to-b, yellow.300, teal.300)"
        clipPath="ellipse(50% 100% at 50% 0%)"
        transform="rotate(3deg)"
        pointerEvents="none"
      />

      <Flex
        direction={["column", "column", "row"]}
        justifyContent="space-between"
        alignItems={["start", "start", "center"]}
        mb={4}
      >
        <Button
          colorScheme="teal"
          boxShadow="lg"
          onClick={() => setIsModalOpen(true)}
          mb={[4, 4, 0]}
        >
          Add Event
        </Button>
        <Flex alignItems="center" mt={[4, 4, 0]}>
          <Select
            placeholder="Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            mx={2}
            w="auto"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <InputGroup w="md">
            <Input
              placeholder="Search events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear Search"
                  icon={<CloseIcon />}
                  onClick={() => setSearchTerm("")}
                />
              </InputRightElement>
            )}
            <InputRightElement>
              <IconButton aria-label="Search Events" icon={<SearchIcon />} />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>
      {/* Events Grid */}
      <Flex flexWrap="wrap" justifyContent="center">
        {filteredEvents.map((event) => (
          <Box
            key={event.id}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            m={4}
            bg="white"
            boxShadow="lg"
            style={{
              border: "2px solid #34a4a0",
              boxShadow: "30px rgb(37, 150, 190)",
            }}
          >
            <Link to={`/event/${event.id}`}>
              <Image
                style={{ height: "50%", width: "100%", objectFit: "cover" }}
                src={event.image}
                alt={event.title}
              />
            </Link>
            <Box p="3">
              <Box d="flex" alignItems="baseline">
                {getCategoryName(event.categoryIds, categories).map((name) => (
                  <Badge
                    borderRadius="full"
                    px="2"
                    colorScheme="teal"
                    p={1}
                    m={1}
                  >
                    {name}
                  </Badge>
                ))}
              </Box>
              <Box
                mt="2"
                fontWeight="bold"
                as="h4"
                lineHeight="tight"
                isTruncated
                color="teal.600"
                _hover={{ textDecoration: "underline" }}
              >
                <Link to={`/event/${event.id}`}>{event.title}</Link>
              </Box>

              <Box d="flex-row" color="gray.600" fontWeight="bold">
                <div style={{ padding: "2px" }}>Location: {event.location}</div>
                <div style={{ padding: "2px" }}>
                  Start Time : {new Date(event.startTime).toLocaleString()}
                </div>
                <div style={{ padding: "2px" }}>
                  End Time : {new Date(event.endTime).toLocaleString()}
                </div>
              </Box>

              <Box d="flex" mt="2" alignItems="center">
                <Box as="span" ml="2" fontSize="sm" fontWeight="bolder">
                  Attendees {event.attendees}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
      <NewEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};

export default EventsPage;
