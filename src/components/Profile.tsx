import React from 'react';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-[#181894] mb-6">
          Profile Page
        </h1>
        <p className="text-lg text-foreground mb-8">
          This page is currently under development. Stay tuned for a fully functional profile experience!
        </p>
        <div className="mb-8">
            <Link to="/">
          <Button 
            className="mx-auto bg-[#181894] mb-4 hover:bg-[#141470] text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <Home size={18} />
            Back to Home
          </Button>
        </Link>

          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwBdumKmKbZTuELU5si4Rb0VfeamoJNW7PA&s" 
            alt="Profile Under Construction" 
            className="mx-auto rounded-lg shadow-lg"
          />

        </div>
        
      </div>
    </div>
  );
};

export default Profile;