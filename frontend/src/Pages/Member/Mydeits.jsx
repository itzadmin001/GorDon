import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../MainCon';
import { db } from "../../Firebase"
import { onValue, ref } from 'firebase/database';

function Mydeits() {
  const [goal, setGoal] = useState('');
  const [mydeits, setMydeits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [DeitsDetails, SetDeitDetails] = useState([])

  // Fetch all diet plans on mount
  useEffect(() => {
    getDataFromFirebase("deitsPlans", (data) => {
      SetDeitDetails(data);
    });
  }, []);

  const getDataFromFirebase = (nodeName, callback) => {
    const dataRef = ref(db, nodeName);

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data).map(([goalName, nested]) => {
          const [_, dietObj] = Object.entries(nested)[0]; // pick first item
          return {
            ...dietObj,
            id: goalName // use goal as ID
          };
        });

        callback(formatted);
      } else {
        callback([]);
      }
    });
  };
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // supplement is an array of { id: goal, ...data }
    const found = DeitsDetails.find(diet =>
      diet.id.toLowerCase().trim() === goal.toLowerCase().trim()
    );
    setMydeits(found || null);
    setLoading(false);
  };

  // Unique goals for dropdown
  const goals = Array.isArray(DeitsDetails)
    ? DeitsDetails.map(diet => diet.id)
    : [];
  console.log(mydeits)
  console.log(DeitsDetails)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-6">View Your Diet Plan</h2>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
          <select
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            required
          >
            <option value="">Select Goal</option>
            {goals.map((g, idx) => (
              <option key={idx} value={g}>{g}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-[#CAFF33] text-gray-900 px-4 py-2 rounded font-bold hover:bg-[#b6e62e] transition w-full md:w-auto"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-[#CAFF33] border-solid"></div>
          </div>
        ) : mydeits ? (
          <div className="bg-gray-900 rounded-lg p-6 shadow-inner">
            <h3 className="text-xl font-semibold text-[#CAFF33] mb-4 text-center">{mydeits.id} Plan</h3>
            <ul className="space-y-3">
              <li>
                <span className="font-bold text-gray-200">Breakfast:</span>
                <span className="ml-2 text-gray-300">{mydeits.breakfast}</span>
              </li>
              <li>
                <span className="font-bold text-gray-200">Lunch:</span>
                <span className="ml-2 text-gray-300">{mydeits.lunch}</span>
              </li>
              <li>
                <span className="font-bold text-gray-200">Dinner:</span>
                <span className="ml-2 text-gray-300">{mydeits.dinner}</span>
              </li>
              <li>
                <span className="font-bold text-gray-200">Snacks:</span>
                <span className="ml-2 text-gray-300">{mydeits.snacks}</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            {goal ? "No diet plan found for this goal." : "Please select a goal to view your diet plan."}
          </div>
        )}
      </div>
    </div>
  );
}

export default Mydeits;