import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, FormControl, FormLabel, useToast, Heading, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaHeart } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-ynv7.fly.dev/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        toast({
          title: "Login Successful",
          description: `Access Token: ${data.accessToken}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
          description: errorData.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://backengine-ynv7.fly.dev/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Sign Up Successful",
          description: "You can now log in with your credentials.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Sign Up Failed",
          description: errorData.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Welcome to Interactive API
          </Heading>
          <Text textAlign="center">Use the forms below to either log in or sign up.</Text>

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </FormControl>

          <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>

          <Button leftIcon={<FaUserPlus />} colorScheme="gray" onClick={handleSignUp}>
            Sign Up
          </Button>

          <Button leftIcon={<FaHeart />} colorScheme="pink" onClick={() => toast({ title: "Health Check Under Construction", status: "info", duration: 5000, isClosable: true })}>
            Health Check
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
