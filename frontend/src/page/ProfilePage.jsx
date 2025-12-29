import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore";
import { User, Mail, Shield, Calendar, Award } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { getSolvedProblemByUser, solvedProblems } = useProblemStore();

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  if (!authUser) return null;

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-200 rounded-xl p-6 space-y-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Profile
            </h1>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={
                  authUser.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    authUser.name || "User"
                  )}&background=random`
                }
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-200 shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="text-center">
                <h2 className="text-xl font-bold">{authUser.name}</h2>
                <div  className="text-sm text-base-content/70 flex items-center justify-center gap-1 mt-1">
                    <span className={`badge ${authUser.role === 'ADMIN' ? 'badge-error' : 'badge-primary'} badge-sm`}>
                        {authUser.role}
                    </span>
                </div>
                
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-base-content/10 pb-2">
                    <User className="w-5 h-5 text-primary"/>
                     Account Details
                </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-base-300 last:border-0">
                  <div className="flex items-center gap-3">
                    <User className="size-4 text-base-content/60" />
                    <span>Full Name</span>
                  </div>
                  <span className="font-medium text-base-content/90">{authUser.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-base-300 last:border-0">
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-base-content/60" />
                    <span>Email Address</span>
                  </div>
                  <span className="font-medium text-base-content/90">{authUser.email}</span>
                </div>
                 <div className="flex items-center justify-between py-2 border-b border-base-300 last:border-0">
                  <div className="flex items-center gap-3">
                    <Shield className="size-4 text-base-content/60" />
                    <span>Role</span>
                  </div>
                  <span className="font-medium text-base-content/90 capitalize">{authUser.role.toLowerCase()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-base-content/10 pb-2">
                    <Award className="w-5 h-5 text-secondary"/>
                     Stats
                </h3>
               <div className="space-y-4 text-sm">
                 <div className="flex items-center justify-between py-2 border-b border-base-300 last:border-0">
                  <div className="flex items-center gap-3">
                    <Calendar className="size-4 text-base-content/60" />
                    <span>Member Since</span>
                  </div>
                  <span className="font-medium text-base-content/90">
                    {new Date(authUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
                 <div className="flex items-center justify-between py-2 border-b border-base-300 last:border-0">
                  <div className="flex items-center gap-3">
                    <Award className="size-4 text-base-content/60" />
                    <span>Problems Solved</span>
                  </div>
                  <span className="font-medium text-base-content/90 text-primary">
                    {solvedProblems?.length || 0}
                  </span>
                </div>
                <div className="bg-base-300/50 p-4 rounded-lg">
                    <p className="text-xs text-base-content/60 text-center italic">
                        "Consistency is the key to mastery. Keep solving!"
                    </p>
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
