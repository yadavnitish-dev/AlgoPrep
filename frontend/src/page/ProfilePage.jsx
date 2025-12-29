import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { User, Mail, Shield, Calendar, Award, ListMusic } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { useProblemStore } from "../store/useProblemStore";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { getSolvedProblemByUser, solvedProblems } = useProblemStore();
  const { getAllPlaylists, playlists } = usePlaylistStore();

  useEffect(() => {
    getSolvedProblemByUser();
    getAllPlaylists();
  }, [getSolvedProblemByUser, getAllPlaylists]);

  if (!authUser) return null;

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-base-200 rounded-xl p-6 shadow-lg h-fit">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  My Profile
                </h1>
              </div>

              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative group">
                  <img
                    src={
                      authUser.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        authUser.name || "User"
                      )}&background=random`
                    }
                    alt="Profile"
                    className="size-28 rounded-full object-cover border-4 border-base-200 shadow-xl"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{authUser.name}</h2>
                  <div className="text-sm text-base-content/70 flex items-center justify-center gap-1 mt-1">
                    <span
                      className={`badge ${
                        authUser.role === "ADMIN"
                          ? "badge-error"
                          : "badge-primary"
                      } badge-sm`}
                    >
                      {authUser.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-base-content/10 pt-4 space-y-3">
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-base-content/70">
                        <Mail className="size-4" />
                        <span>Email</span>
                    </div>
                    <span className="font-medium truncate max-w-[150px]">{authUser.email}</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-base-content/70">
                        <Calendar className="size-4" />
                        <span>Joined</span>
                    </div>
                    <span className="font-medium">{new Date(authUser.createdAt).toLocaleDateString()}</span>
                 </div>
              </div>
            </div>

             {/* Stats Card - Moved here for compactness in left column */}
            <div className="bg-base-200 rounded-xl p-6 shadow-lg">
                 <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-base-content/10 pb-3 mb-4">
                    <Award className="w-5 h-5 text-secondary"/>
                     Stats
                </h3>
                 <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Award className="size-4 text-base-content/60" />
                    <span>Problems Solved</span>
                  </div>
                  <span className="font-bold text-lg text-primary">
                    {solvedProblems?.length || 0}
                  </span>
                </div>
                <div className="bg-base-300/50 p-3 rounded-lg mt-4">
                    <p className="text-xs text-base-content/60 text-center italic">
                        "Consistency is the key to mastery. Keep solving!"
                    </p>
                </div>
            </div>
          </div>

          {/* Right Column: Playlists */}
          <div className="lg:col-span-2">
            <div className="bg-base-200 rounded-xl p-6 shadow-lg h-full">
              <h3 className="text-xl font-bold flex items-center gap-2 border-b border-base-content/10 pb-4 mb-6">
                <ListMusic className="w-5 h-5 text-accent" />
                My Playlists
              </h3>

              {playlists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {playlists.map((playlist) => (
                    <Link
                      key={playlist.id}
                      to={`/playlist/${playlist.id}`}
                      className="group block p-4 bg-base-100 rounded-lg hover:shadow-md transition-all border border-base-content/5 hover:border-primary/50"
                    >
                      <div className="flex items-start justify-between h-full">
                        <div className="flex-1 min-w-0 mr-2"> 
                          <h4 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                            {playlist.name}
                          </h4>
                          <p className="text-sm text-base-content/70 mt-1 line-clamp-2">
                            {playlist.description || "No description"}
                          </p>
                        </div>
                        <span className="badge badge-sm badge-ghost whitespace-nowrap">
                          {playlist.problems?.length || 0} problems
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-base-content/60 border-2 border-dashed border-base-content/10 rounded-xl">
                  <ListMusic className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="text-lg">No playlists created yet.</p>
                  <Link to="/" className="btn btn-primary btn-sm mt-4">
                    Browse Problems to Create One
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
