import React, { useState } from "react";
import { Play, Image as ImageIcon, Globe, Info, ExternalLink } from "lucide-react";
import {
  BIRD_VIDEOS,
  BIRD_IMAGES,
  BIRD_SITES,
  getImagesForSection,
  getVideosForSection,
  getImagesByCategory,
  type BIRDVideo,
  type BIRDImage,
  type BIRDSite,
} from "@/lib/bird-urls";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// ── Category Color Mapping ──────────────────────────────────────────────────────
const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  framework: { bg: "bg-[#C9A84C]/20", text: "text-[#E8C560]", border: "border-[#C9A84C]/40" },
  systems: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/40" },
  archetype: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/40" },
  cluster: { bg: "bg-teal-500/20", text: "text-teal-400", border: "border-teal-500/40" },
  connectivity: { bg: "bg-sky-500/20", text: "text-sky-400", border: "border-sky-500/40" },
  provincial: { bg: "bg-violet-500/20", text: "text-violet-400", border: "border-violet-500/40" },
  leverage: { bg: "bg-rose-500/20", text: "text-rose-400", border: "border-rose-500/40" },
  roadmap: { bg: "bg-[#C9A84C]/20", text: "text-[#E8C560]", border: "border-[#C9A84C]/40" },
  metrics: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/40" },
  governance: { bg: "bg-indigo-500/20", text: "text-indigo-400", border: "border-indigo-500/40" },
  branding: { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-slate-500/40" },
  survey: { bg: "bg-lime-500/20", text: "text-lime-400", border: "border-lime-500/40" },
};

const getCategoryStyle = (category: string) => {
  return CATEGORY_STYLES[category] || { bg: "bg-[#C9A84C]/10", text: "text-[#E8C560]", border: "border-[#C9A84C]/30" };
};

// ── Video Thumbnail Component ───────────────────────────────────────────────────
const VideoThumbnail: React.FC<{ video: BIRDVideo; compact?: boolean }> = ({ video, compact }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Extract YouTube video ID safely
  const videoId = video.url.includes("v=") 
    ? video.url.split("v=")[1]?.split("&")[0] 
    : video.url.split("/").pop()?.split("?")[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 rounded-lg bg-[#022c22]/60 border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all text-left w-full group",
            compact ? "px-3 py-2" : "flex-col p-3"
          )}
        >
          <div
            className={cn(
              "rounded-full bg-[#C9A84C]/20 flex items-center justify-center group-hover:bg-[#C9A84C]/30",
              compact ? "w-8 h-8" : "w-12 h-12 mb-2"
            )}
          >
            <Play className={cn("text-[#C9A84C] fill-current", compact ? "w-4 h-4" : "w-5 h-5")} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn("font-semibold text-[#E8C560] truncate", compact ? "text-xs" : "text-sm")}>
              {video.title}
            </p>
            {!compact && <p className="text-[10px] text-[#ecfdf5]/50">{video.duration}</p>}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-[#022c22] border-[#C9A84C]/30 text-[#ecfdf5]">
        <DialogHeader>
          <DialogTitle className="text-[#C9A84C] font-serif">{video.title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video rounded-lg overflow-hidden border border-[#C9A84C]/20">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="text-sm text-[#ecfdf5]/70 mt-2">{video.description}</p>
      </DialogContent>
    </Dialog>
  );
};

// ── Image Card Component ────────────────────────────────────────────────────────
const ImageCard: React.FC<{ image: BIRDImage; compact?: boolean }> = ({ image, compact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const catStyle = getCategoryStyle(image.category);

  if (compact) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#022c22]/60 border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10 transition-all text-left w-full">
            <div className="w-8 h-8 rounded bg-[#C9A84C]/20 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-[#C9A84C]" />
            </div>
            <p className="text-xs font-semibold text-[#E8C560] truncate flex-1">{image.title}</p>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl bg-[#022c22] border-[#C9A84C]/30 text-[#ecfdf5]">
          <DialogHeader>
            <DialogTitle className="text-[#C9A84C] font-serif">{image.title}</DialogTitle>
          </DialogHeader>
          <img src={image.url} alt={image.alt} className="w-full rounded-lg border border-[#C9A84C]/20" />
          <div className="flex items-start gap-2 mt-2">
            <Info className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#ecfdf5]/70">{image.description}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className={`text-[10px] ${catStyle.border} ${catStyle.text} ${catStyle.bg}`}>
              {image.category}
            </Badge>
            <Badge variant="outline" className="text-[10px] border-[#C9A84C]/30 text-[#ecfdf5]/50">
              {image.section}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="rounded-xl overflow-hidden border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all bg-[#011a12] text-left w-full group">
          <div className="aspect-[4/3] bg-[#022c22] relative">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <div className="absolute bottom-3 left-3">
              <Badge variant="outline" className={`text-[9px] ${catStyle.border} ${catStyle.text} ${catStyle.bg}`}>
                {image.category}
              </Badge>
            </div>
          </div>
          <div className="p-3">
            <p className="text-sm font-semibold text-[#E8C560] line-clamp-2">{image.title}</p>
            {image.description && (
              <p className="text-[10px] text-[#ecfdf5]/40 mt-1 line-clamp-2">{image.description}</p>
            )}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-[#022c22] border-[#C9A84C]/30 text-[#ecfdf5]">
        <DialogHeader>
          <DialogTitle className="text-[#C9A84C] font-serif">{image.title}</DialogTitle>
        </DialogHeader>
        <img src={image.url} alt={image.alt} className="w-full rounded-lg border border-[#C9A84C]/20" />
        <div className="flex items-start gap-2 mt-2">
          <Info className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-[#ecfdf5]/70">{image.description}</p>
        </div>
        <div className="flex gap-2 mt-2">
          <Badge variant="outline" className={`text-[10px] ${catStyle.border} ${catStyle.text} ${catStyle.bg}`}>
            {image.category}
          </Badge>
          <Badge variant="outline" className="text-[10px] border-[#C9A84C]/30 text-[#ecfdf5]/50">
            {image.section}
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ── Site Link Component ─────────────────────────────────────────────────────────
const SiteLink: React.FC<{ site: BIRDSite }> = ({ site }) => (
  <a
    href={site.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#022c22]/60 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/5 transition-all group"
  >
    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center group-hover:bg-[#C9A84C]/20">
      <Globe className="w-5 h-5 text-[#C9A84C]" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-[#E8C560] flex items-center gap-2">
        {site.title}
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </p>
      <p className="text-[10px] text-[#ecfdf5]/50 truncate">{site.description}</p>
    </div>
  </a>
);

// ── Main ContextPanel Component ─────────────────────────────────────────────────
interface ContextPanelProps {
  sectionId?: string;
  category?: string;
  compact?: boolean;
}

export const ContextPanel: React.FC<ContextPanelProps> = ({ sectionId, category, compact = false }) => {
  const sectionVideos = sectionId ? getVideosForSection(sectionId) : Object.values(BIRD_VIDEOS);
  const sectionImages = category
    ? getImagesByCategory(category)
    : sectionId
    ? getImagesForSection(sectionId)
    : Object.values(BIRD_IMAGES);
  const sites = Object.values(BIRD_SITES);

  const hasContent = sectionVideos.length > 0 || sectionImages.length > 0;
  if (!hasContent && !compact) return null;

  const defaultTab = sectionVideos.length > 0 ? "videos" : sectionImages.length > 0 ? "images" : "sites";

  return (
    <div className={cn("rounded-xl border border-[#C9A84C]/20 bg-[#011a12]/50 backdrop-blur-sm", compact ? "p-3" : "p-4")}>
      {!compact && (
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-[#C9A84C]" />
          <h4 className="text-sm font-bold text-[#C9A84C] uppercase tracking-wider">Context & References</h4>
          {(sectionVideos.length + sectionImages.length + sites.length) > 0 && (
            <Badge variant="outline" className="text-[9px] border-[#C9A84C]/30 text-[#C9A84C]/70 ml-auto">
              {sectionVideos.length + sectionImages.length + sites.length} items
            </Badge>
          )}
        </div>
      )}

      <Tabs defaultValue={defaultTab} className="w-full">
        {!compact && (
          <TabsList className="bg-[#022c22]/60 border border-[#C9A84C]/20 w-full mb-3 flex-wrap h-auto py-1">
            {sectionVideos.length > 0 && (
              <TabsTrigger value="videos" className="text-xs data-[state=active]:bg-[#C9A84C] data-[state=active]:text-[#022c22]">
                <Play className="w-3 h-3 mr-1" /> Videos ({sectionVideos.length})
              </TabsTrigger>
            )}
            {sectionImages.length > 0 && (
              <TabsTrigger value="images" className="text-xs data-[state=active]:bg-[#C9A84C] data-[state=active]:text-[#022c22]">
                <ImageIcon className="w-3 h-3 mr-1" /> Images ({sectionImages.length})
              </TabsTrigger>
            )}
            <TabsTrigger value="sites" className="text-xs data-[state=active]:bg-[#C9A84C] data-[state=active]:text-[#022c22]">
              <Globe className="w-3 h-3 mr-1" /> Sites ({sites.length})
            </TabsTrigger>
          </TabsList>
        )}

        {sectionVideos.length > 0 && (
          <TabsContent value="videos">
            <ScrollArea className={compact ? "h-48" : "h-64"}>
              <div className={cn("grid gap-2", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 gap-3")}>
                {sectionVideos.map((v, i) => (
                  <VideoThumbnail key={i} video={v} compact={compact} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        )}

        {sectionImages.length > 0 && (
          <TabsContent value="images">
            <ScrollArea className={compact ? "h-48" : "h-72"}>
              <div className={cn("grid gap-2", compact ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3 gap-3")}>
                {sectionImages.map((img, i) => (
                  <ImageCard key={i} image={img} compact={compact} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        )}

        <TabsContent value="sites">
          <ScrollArea className={compact ? "h-48" : "h-72"}>
            <div className="space-y-2">
              {sites.map((s, i) => (
                <SiteLink key={i} site={s} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContextPanel;
