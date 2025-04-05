import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Company } from "@/services/companyService";
import { useState } from "react";
import CompanyLogo from "./CompanyLogo";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CompanyCardProps {
  company: Company;
  onTagClick?: (tag: string) => void;
  expanded?: boolean;
  onToggleExpand?: () => void;
}

export function CompanyCard({ company, onTagClick, expanded = false, onToggleExpand }: CompanyCardProps) {
  const navigate = useNavigate();
  const [showJobs, setShowJobs] = useState(false);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleJobsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowJobs(!showJobs);
  };

  return (
    <motion.div
      layout
      animate={{
        scale: isExpanded ? 1 : 0.98,
        borderRadius: isExpanded ? 12 : 8
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full"
    >
      <Card 
        className={`w-full overflow-hidden ${isExpanded ? 'shadow-xl' : 'hover:shadow-lg hover:scale-[1.02] transition-transform'}`}
        onClick={() => {
          setIsExpanded(!isExpanded);
          onToggleExpand?.();
        }}
      >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <CompanyLogo name={company.name} logo={company.logo} size="lg" />
            <div>
              <CardTitle className="text-xl mb-2">{company.name}</CardTitle>
              <CardDescription className="text-sm">
                {company.headquarters} · {company.size} employees
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={company.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              height: isExpanded ? 'auto' : '100px',
              overflow: isExpanded ? 'visible' : 'hidden'
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div>
              <h3 className="font-medium mb-2">Interview Process</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {company.interviewProcess.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Coding Style</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {company.codingStyle.map((style, index) => (
                  <li key={index}>{style}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Benefits</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {company.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            {company.jobs.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Available Jobs ({company.jobs.length})</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleJobsClick}
                    className="p-0 h-6"
                  >
                    {showJobs ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <AnimatePresence>
                  {showJobs && (
                    <motion.ul 
                      className="space-y-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {company.jobs.map((job, index) => (
                        <motion.li 
                          key={index} 
                          className="border rounded-md p-3 hover:border-primary/50 transition-colors cursor-pointer"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/jobs/${job.id}`);
                          }}
                        >
                          <div className="font-medium text-foreground">{job.title}</div>
                          <div className="text-xs mt-1">{job.location} · {job.type}</div>
                          {job.salary && (
                            <div className="text-xs mt-1 text-green-600">{job.salary}</div>
                          )}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}

            <motion.div 
              className="pt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {company.noWhiteboard && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  No Whiteboard
                </Badge>
              )}
              {company.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick?.(tag);
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
    </motion.div>
  );
}