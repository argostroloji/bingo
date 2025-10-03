import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PointsDisplayProps {
  points: number;
  animated?: boolean;
}

export default function PointsDisplay({ points, animated = false }: PointsDisplayProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
      <div className="p-2 rounded-md bg-primary/20">
        <Sparkles className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Total Points</p>
        <motion.p
          key={points}
          initial={animated ? { scale: 1.2 } : {}}
          animate={{ scale: 1 }}
          className="text-3xl font-bold font-mono"
          data-testid="text-points"
        >
          {points.toLocaleString()}
        </motion.p>
      </div>
    </div>
  );
}
