import React, { useEffect, useState } from "react";
import FoodStatusCard from "./FoodStatusCard";
import FoodViewModel from "../viewModel/FoodViewModel";

const FoodStatusView = () => {
    const [foodStatus, setFoodStatus] = useState(null);
    
    useEffect(() => {
        const fetchFoodStatus = async () => {
            const data = await FoodViewModel.getFoodStatus();
            setFoodStatus(data);
        };
        fetchFoodStatus();
    }, []);
    
    return (
        <div>
            <h2>Estado del Alimento</h2>
            {foodStatus && <FoodStatusCard food={foodStatus} />}
        </div>
    );
};

export default FoodStatusView;