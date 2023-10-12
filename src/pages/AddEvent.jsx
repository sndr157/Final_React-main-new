import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react";

export const action = async (formData) => {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const json = await response.json();
  return json.id;
};

export const AddEvent = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    location: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const eventData = await response.json();
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryIds: selectedCategoryIds,
    }));
  };

  const handleDelete = async (eventId) => {
    try {
      await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });
      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents);

      toast({
        title: "Event deleted.",
        description: "Your event has been successfully deleted.",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const categories = [
    { id: 1, name: "sports" },
    { id: 2, name: "Games" },
    { id: 3, name: "Sports" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.title) {
      errors.title = "Title is required";
    }
    if (!formData.startTime) {
      errors.startTime = "Start time is required";
    }
    if (!formData.endTime) {
      errors.endTime = "End time is required";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const eventId = await action(formData);
      navigate(`/event/${eventId}`);

      toast({
        title: "Event created.",
        description: "Your event has been successfully created.",
        status: "success",
        isClosable: true,
      });

      // Reset form data
      setFormData({
        title: "",
        description: "",
        image: "",
        startTime: "",
        endTime: "",
        categoryIds: [],
        location: "",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create event.",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel color="teal.500">Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {formErrors.title && (
            <Text color="red" fontSize="sm">
              {formErrors.title}
            </Text>
          )}
        </FormControl>
        <FormControl mt={4}>
          <FormLabel color="teal.500">Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel color="teal.500">Image URL</FormLabel>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel color="teal.500">Start Time</FormLabel>
          <Input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
          />
          {formErrors.startTime && (
            <Text color="red" fontSize="sm">
              {formErrors.startTime}
            </Text>
          )}
        </FormControl>
        <FormControl mt={4}>
          <FormLabel color="teal.500">End Time</FormLabel>
          <Input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
          />
          {formErrors.endTime && (
            <Text color="red" fontSize="sm">
              {formErrors.endTime}
            </Text>
          )}
        </FormControl>
        <FormControl mt={4}>
          <FormLabel color="teal.500">Categories</FormLabel>
          <Select
            name="categoryIds"
            onChange={handleCategoryChange}
            h="20"
            multiple
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name[0].toUpperCase() + category.name.slice(1)}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel color="teal.500">Location</FormLabel>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Add Event
        </Button>
      </form>
      <Box mt={6}>
        <Heading size="lg">Events List</Heading>
        <Box mt={4}>
          {events.map((event) => (
            <Box
              key={event.id}
              border="1px solid gray"
              p={4}
              mb={4}
              borderRadius="md"
            >
              <Image
                src={event.image}
                alt={event.title}
                maxH="200px"
                objectFit="cover"
              />
              <Text fontSize="xl" fontWeight="bold" mt={2}>
                {event.title}
              </Text>
              <Text color="gray.600">{event.description}</Text>
              <Text mt={2}>Location: {event.location}</Text>
              <Text>
                Start Time: {new Date(event.startTime).toLocaleString()}
                <br />
                End Time: {new Date(event.endTime).toLocaleString()}
              </Text>
              <Button
                mt={2}
                colorScheme="purple"
                size="sm"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AddEvent;
