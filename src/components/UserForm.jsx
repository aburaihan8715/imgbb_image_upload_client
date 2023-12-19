import axios from "axios";
import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

const initialFormData = {
  name: "",
  email: "",
  image: null,
};

const UserForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { refetch } = useUsers();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.image) return alert("Name,email and image are required!");

    // FormData object to send text data and file
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("image", formData.image);
    try {
      // Upload image to imgBB
      const imgBBResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formDataToSend);
      if (!imgBBResponse.data.success) throw new Error("Failed to fetch image url!");
      const imageUrl = imgBBResponse.data.data.url;
      await axios.post("http://localhost:5000/api/users/create", {
        name: formData.name,
        email: formData.email,
        image: imageUrl,
      });
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      alert("User added successfully!");
      refetch();
      e.target.reset();
    }
  };
  return (
    <div className="p-4">
      <h3 className="text-center text-3xl font-medium uppercase">add user</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-1">
          <label>Name</label>
          <input onChange={handleInputChange} name="name" className="w-full p-3 border rounded text-black" type="text" placeholder="Enter name" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input onChange={handleInputChange} name="email" className="w-full p-3 border rounded text-black" type="email" placeholder="Enter email" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Image</label>
          <input accept="image/*" onChange={handleImageChange} name="image" className="w-full px-3 py-2 border rounded " type="file" />
        </div>

        <div>
          <button className="c-btn bg-green-600 w-full p-3" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
