import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Company } from "@/services/companyService";
import { useState } from "react";
import CompanyLogo from "./CompanyLogo";

interface CompanyCardProps {
  company: Company;
  onTagClick?: (tag: string) => void;
}

export function CompanyCard({ company, onTagClick }: CompanyCardProps) {
  const [showJobs, setShowJobs] = useState(false);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
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
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
                  onClick={() => setShowJobs(!showJobs)}
                  className="p-0 h-6"
                >
                  {showJobs ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {showJobs && (
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {company.jobs.map((job, index) => (
                    <li key={index} className="border rounded-md p-3">
                      <div className="font-medium text-foreground">{job.title}</div>
                      <div className="text-xs mt-1">{job.location} · {job.type}</div>
                      {job.salary && (
                        <div className="text-xs mt-1 text-green-600">{job.salary}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="pt-4 flex flex-wrap gap-2">
            {company.noWhiteboard && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                No Whiteboard
              </Badge>
            )}
            {company.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => onTagClick?.(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}