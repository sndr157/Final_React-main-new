import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./Navigation";
import { EventsPage } from "./EventsPage";
import { AddEvent } from "./AddEvent";
import { EventPage } from "./EventPage";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
import { Root } from "./components/Root";
import { EventProvider } from "./EventContext";
import theme from "./chakra-theme";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <EventProvider>
        <Router>
          <Routes>
            <Navigation />
            <Route path="/events/*" element={<EventsPage />} />
            <Route path="/event/new" element={<AddEvent />} />
            <Route path="/event/:eventId" element={<EventPage />} />
            <Route path="*" element={<Root />} />
          </Routes>
        </Router>
      </EventProvider>
      {/* Background elements */}
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
    </ChakraProvider>
  );
};

export default App;
