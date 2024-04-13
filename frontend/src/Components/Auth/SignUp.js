import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SignUp = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const postDetails = async (pics) => {
    setLoading(true);
    if (!pics) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return null; // Return null if no image is selected
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatAPP");
      data.append("cloud_name", "dbiqgfnkt");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dbiqgfnkt/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const responseData = await response.json();
        setLoading(false);
        return responseData; // Return the response from Cloudinary
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
        return null; // Return null if there's an error
      }
    } else {
      console.error("Invalid file type. Please upload a JPEG or PNG image.");
      setLoading(false);
      return null; // Return null if the file type is invalid
    }
  };
  const [formData, setFormData] = useState({
    name: "", // Add name field
    email: "",
    password: "",
    confirmPassword: "",
    pic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      pic: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Cloudinary and get URL
      const cloudinaryResponse = await postDetails(formData.pic);
      const picUrl = cloudinaryResponse.url;

      // Send form data to the backend API
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "shanaka",
          email: "sp8@gmail.com",
          password: "shanaka",
          pic: picUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      // Reset form fields after successful submission
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        pic: null,
      });

      // Optionally display a success message
      toast({
        title: "User registered successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      // Optionally display an error message
      toast({
        title: "Error registering user. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
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
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="pic" isRequired>
            <FormLabel>Profile Picture</FormLabel>
            <Input
              type="file"
              name="pic"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </FormControl>
          {formData.pic && (
            <Image src={URL.createObjectURL(formData.pic)} alt="Profile Pic" />
          )}
          <Button type="submit" isLoading={loading}>
            Sign Up
          </Button>
        </VStack>
      </form>
    </div>
  );
};

export default SignUp;
