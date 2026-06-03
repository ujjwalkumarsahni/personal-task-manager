import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  );
};

export default Loader;