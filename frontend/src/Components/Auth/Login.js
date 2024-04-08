import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form fields after submission if needed
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit">Login</Button>
        </VStack>
      </form>
    </div>
  );
};

export default Login;
