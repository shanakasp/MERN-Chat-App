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
  const postDetails = (pics) => {
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
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatAPP");
      data.append("cloud_name", "dbiqgfnkt");

      fetch(`https://api.cloudinary.com/v1_1/dbiqgfnkt/image/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to upload image");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Image uploaded successfully:", data.url);
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setLoading(false);
        });
    } else {
      console.error("Invalid file type. Please upload a JPEG or PNG image.");
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    postDetails(formData.pic);
    console.log(formData);
    // Reset form fields after submission if needed
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      pic: null,
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
