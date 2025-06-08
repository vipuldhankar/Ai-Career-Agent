import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';

const UserSubscriptionStatus = () => {
  const { has } = useAuth();
  const [remainingEntries, setRemainingEntries] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);
  const [isProUser, setIsProUser] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkUserSubscription = async () => {
      setLoading(true);

      // Check if the user has a Pro subscription
      //@ts-ignore
      const hasSubscriptionEnabled = await has({ plan: 'pro_user' });
      setIsProUser(hasSubscriptionEnabled);

      if (!hasSubscriptionEnabled) {
        try {
          const resultHistory = await axios.get('/api/history');
          const historyList = resultHistory.data;

          const userEmail = historyList[0]?.userEmail;
          setUserEmail(userEmail);

          const userHistoryEntries = historyList.filter(
            (item: any) => item.userEmail === userEmail
          );

          setRemainingEntries(Math.max(0, 5 - userHistoryEntries.length)); // Limit at 0 for non-Pro users
        } catch (error) {
          console.error('Error fetching history data:', error);
        }
      }

      setLoading(false);
    };

    checkUserSubscription();
  }, [has]);

  return (
    <div className="p-5 bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6] rounded-xl mb-5 shadow-lg flex items-center justify-between">
      <div>
        {loading ? (
          <p className="text-white"><Loader2Icon className="animate-spin" /> Loading subscription details...</p>
        ) : isProUser ? (
          <p className="text-white font-semibold">You are a Pro user! Enjoy unlimited access.</p>
        ) : (
          <p className="text-white">
            You have {remainingEntries} {remainingEntries === 1 ? 'entry' : 'entries'} remaining in your free limit.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserSubscriptionStatus;
