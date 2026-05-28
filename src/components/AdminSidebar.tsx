'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, LogOut, Layers } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Projects', href: '/admin/projects', icon: Layers },
    { name: 'Careers', href: '/admin/careers', icon: Briefcase },
  ];

  const handleLogout = async () => {
      await signOut(auth);
      router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-[#062516] text-white min-h-screen flex flex-col shadow-xl z-20 sticky top-0 h-screen">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-tight">JIVO Admin</h1>
        <p className="text-xs text-gray-400 mt-1">Management Portal</p>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-white text-[#062516] shadow-md' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon 
                size={20} 
                className={`mr-3 ${isActive ? 'text-[#062516]' : 'text-gray-400 group-hover:text-white'}`} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
