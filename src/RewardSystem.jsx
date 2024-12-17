import React, { useEffect, useState } from 'react';
import { FaCrown, FaTrophy } from 'react-icons/fa';
import { IoIosStar } from 'react-icons/io';
import axios from 'axios';

const RewardSystem = () => {
      const [vehicles, setVehicles] = useState([]);
      const [rankedPlates, setRankedPlates] = useState([]);

      useEffect(() => {
            const fetchVehicles = async () => {
                  try {
                        const response = await axios.get('https://capstone-parking.onrender.com/vehicle');
                        setVehicles(response.data);
                  } catch (error) {
                        console.error('Error fetching vehicles:', error);
                  }
            };
            fetchVehicles();
      }, []);

      useEffect(() => {
            if (vehicles.length > 0) {
                  const plateCounts = vehicles.reduce((acc, vehicle) => {
                        const plate = vehicle.plateNumber.toUpperCase();
                        acc[plate] = (acc[plate] || 0) + 1;
                        return acc;
                  }, {});

                  const qualifiedPlates = Object.entries(plateCounts)
                        .map(([plate, count]) => ({ plate, count }))
                        .filter(({ count }) => count >= 5)
                        .sort((a, b) => b.count - a.count || a.plate.localeCompare(b.plate))
                        .slice(0, 5);

                  setRankedPlates(qualifiedPlates);
            }
      }, [vehicles]);

      return (
            <div className="mx-auto mt-16 max-w-4xl px-4 lg:px-0 text-gray-800">
                  {/* Header Section */}
                  <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
                              Reward System
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                              Recognizing the most frequent parkers in our system
                        </p>
                  </div>

                  {/* Top Performer */}
                  {rankedPlates[0] && (
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-md mb-8">
                              <div className="flex justify-center items-center gap-4">
                                    <FaCrown className="text-6xl" />
                                    <h2 className="text-2xl font-bold">Top Performer</h2>
                              </div>
                              <p className="mt-4 text-center text-lg">
                                    Congratulations to <strong>{rankedPlates[0].plate}</strong> with{' '}
                                    {rankedPlates[0].count} parks!
                              </p>
                        </div>
                  )}

                  {/* Rankings Table */}
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                              Top 5 Frequent Parkers
                        </h3>
                        <table className="w-full table-auto text-left text-gray-700">
                              <thead className="bg-blue-600 text-white">
                                    <tr>
                                          <th className="p-4 rounded-tl-lg">Rank</th>
                                          <th className="p-4">Plate Number</th>
                                          <th className="p-4">Park Count</th>
                                          <th className="p-4 rounded-tr-lg">Reward</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {rankedPlates.length > 0 ? (
                                          rankedPlates.map((plate, index) => (
                                                <tr
                                                      key={index}
                                                      className={`border-b last:border-none ${index === 0 ? 'bg-yellow-100 font-bold' : ''
                                                            }`}
                                                >
                                                      <td className="p-4 flex items-center gap-2 text-center">
                                                            {index === 0 && <FaCrown className="text-yellow-500 text-lg" />}
                                                            {index === 1 && <FaTrophy className="text-gray-500 text-lg" />}
                                                            {index === 2 && <FaTrophy className="text-yellow-700 text-lg" />}
                                                            {index >= 3 && <IoIosStar className="text-yellow-500 text-lg" />}
                                                            <span>{index + 1}</span>
                                                      </td>
                                                      <td className="p-4">{plate.plate}</td>
                                                      <td className="p-4">{plate.count}</td>
                                                      <td className="p-4">
                                                            {index === 0
                                                                  ? 'Free Parking!'
                                                                  : index === 1
                                                                        ? 'Discount 75%'
                                                                        : index === 2
                                                                              ? 'Discount 50%'
                                                                              : index === 3
                                                                                    ? 'Discount 25%'
                                                                                    : 'Discount 10%'}
                                                      </td>
                                                </tr>
                                          ))
                                    ) : (
                                          <tr>
                                                <td
                                                      colSpan="4"
                                                      className="text-center p-4 text-gray-500 italic"
                                                >
                                                      No one has qualified for the Top 5 yet!
                                                </td>
                                          </tr>
                                    )}
                              </tbody>
                        </table>
                  </div>

                  {/* Motivation Section */}
                  <div className="mt-10 bg-gradient-to-r from-purple-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-center mb-4">How to Earn Rewards</h2>
                        <ul className="list-disc list-inside space-y-2">
                              <li>Park at least five times to qualify.</li>
                              <li>Park frequently to increase your rank.</li>
                              <li>Top-ranked users receive exclusive rewards.</li>
                              <li>Stay consistent to maintain your position on the leaderboard.</li>
                        </ul>
                  </div>
            </div>
      );
};

export default RewardSystem;
