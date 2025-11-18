'use client';

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Compressor } from "@/components/Compressor";
import { 
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Users,
  FileText,
  Palette,
  Layers,
  Zap,
  UploadCloud,
  Layers3,
  Search,
  Download,
  ExternalLink
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui/card";

const features = [
  { icon: Layers3, title: "Lossless Compression", description: "Reduce file size with zero quality loss for perfect clarity." },
  { icon: Layers, title: "Batch Processing", description: "Our bulk image compression tool can compress multiple files at once." },
  { icon: UploadCloud, title: "Large File Support", description: "Easily upload and compress files up to 5GB." },
  { icon: ShieldCheck, title: "Secure & Private", description: "Files are processed securely and deleted after a few hours." },
  { icon: Zap, title: "Fast Global Performance", description: "Our powerful cloud servers shrink files online in seconds." },
  { icon: Users, title: "Universal Format Support", description: "Compress images, documents, videos, and archives." },
];

const useCases = [
  { title: "Students", description: "Reduce the size of assignments and presentations for easy submission." },
  { title: "HR Professionals", description: "Compress resumes and documents for efficient email sharing." },
  { title: "Graphic Designers", description: "Optimize image portfolios for faster web loading." },
  { title: "Office Users", description: "Shrink reports and spreadsheets to meet email attachment limits." },
  { title: "Freelancers", description: "Deliver smaller project files to clients more quickly." },
  { title: "Content Creators", description: "Compress videos and media for faster uploads to social platforms." },
]

const faqItems = [
    {
        question: "Is this online file compressor completely free?",
        answer: "Yes, our Universal File Compressor is a free file compressor for standard use. We offer generous limits that are sufficient for most users. For heavy-duty enterprise needs, we may offer premium plans in the future."
    },
    {
        question: "How does lossless file compression work?",
        answer: "Lossless file compression works by identifying and eliminating statistical redundancy. It restructures data without discarding any information, allowing the original file to be perfectly reconstructed. This is how you reduce file size without losing quality."
    },
    {
        question: "Are my files secure when I compress files online?",
        answer: "Absolutely. We use end-to-end encryption. Your files are only processed on our servers and are automatically and permanently deleted after 2 hours. We do not access, share, or store your files."
    },
    {
        question: "What is the maximum file size I can upload?",
        answer: "You can upload files up to 5GB. This allows for the compression of large documents, high-resolution images, and even video files. It's the best file compressor online for large files."
    },
    {
        question: "Can I compress multiple files at once?",
        answer: "Yes, our tool fully supports batch compression. You can use it as a bulk image compression tool by dragging and dropping multiple files or an entire folder, and compress them all with a single click."
    },
    {
        question: "Which file formats can I compress online?",
        answer: "We support a vast range of formats, including images (JPG, PNG, WebP, HEIC, SVG), documents (PDF, DOCX, PPTX, XLSX), archives (ZIP, RAR, 7Z), and videos (MP4, MOV). Our universal file compressor tool can attempt to compress any file type."
    },
    {
        question: "Can I use this after I convert PDF to DOCX online?",
        answer: "Definitely. Our tool is the perfect next step after using a 'PDF to Word online free' service. Once you 'convert PDF to DOCX online', the resulting Word file might be larger. Use our online compressor for documents to shrink it down. It's the 'best PDF to Word converter' companion tool, especially when you need to handle a 'convert large PDF to Word' task before you 'edit PDF in Word'."
    },
    {
        question: "Will compressing an image reduce its quality?",
        answer: "With our 'Lossless Compression' mode, you can compress JPG without losing quality and compress PNG free online with perfect clarity. The 'High-Quality' and 'Maximum' modes may introduce minimal reductions to achieve smaller file sizes."
    },
    {
        question: "How do I download the compressed files?",
        answer: "After compression, each file will have a 'Download' button. For batch jobs, a 'Download All as ZIP' button will appear, allowing you to get all your optimized files in a single archive."
    },
    {
        question: "Does this work on mobile devices?",
        answer: "Yes, our tool is fully responsive and designed to work seamlessly on all devices. You can compress files online using your desktop, tablet, or smartphone."
    },
    {
        question: "How do I compress a PDF to a smaller size?",
        answer: "Simply upload your PDF file, choose your desired compression mode (Lossless, High-Quality, or Maximum), and click 'Compress'. Our tool will automatically compress the PDF to a smaller size, making it easier to share and store."
    }
];

const relatedTools = [
  {
    title: 'PDF Splitter',
    description: 'Split your PDF files into multiple documents.',
    link: '#',
  },
  {
    title: 'Image Compressor',
    description: 'Reduce image file sizes for free.',
    link: '#',
  },
  {
    title: 'More PDF Tools',
    description: 'Explore our full suite of online tools.',
    link: '#',
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground/90">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Logo />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Universal File Compressor
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              The best free file compressor to compress images, PDFs, and documents online. Reduce file size without losing quality with our universal file compressor tool.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="lg" onClick={() => document.getElementById('compressor-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Upload & Compress Files <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Main Tool Interface */}
        <section id="compressor-section" className="py-12 md:py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <Compressor />
          </div>
        </section>

        {/* Long Description */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4 space-y-8 text-lg text-foreground/80">
            <h2 className="text-3xl font-bold text-center font-headline text-foreground">Why an Online File Compressor is Essential</h2>
            <p>In today's data-driven world, file sizes are constantly growing. Our universal file compressor tool helps you shrink files online, from high-resolution images to detailed documents. Large files consume significant storage and bandwidth, leading to slow websites and difficulty sharing files. When you compress files online, you create a more efficient digital workflow.</p>
            <p>At its core, compression is about making files smaller. The distinction between 'lossy' and 'lossless' is crucial. While lossy compression can reduce quality, our online file compressor champions <strong className="text-primary">lossless file compression</strong>. This advanced technique allows you to reduce file size without losing quality, which is critical for professionals who need to compress images online or compress documents online with perfect fidelity.</p>
            <p>Whether you need to <strong className="font-semibold">compress PDF online</strong> for an email attachment, or <strong className="font-semibold">compress a ZIP file online free</strong> for faster sharing, our tool is the solution. It's the best file compressor online because it's fast, free, and secure.</p>
            <p>Many users find our tool invaluable after using a <strong className="font-semibold">PDF to Word online free</strong> service. When you <strong className="font-semibold">convert PDF to DOCX online</strong>, the resulting file can sometimes be larger than the original. Our tool is the <strong className="font-semibold">best PDF to Word converter</strong> companion, allowing you to shrink that DOCX file back down. This is especially useful when dealing with a <strong className="font-semibold">convert large PDF to Word</strong> task, as it makes the document easier to email and <strong className="font-semibold">edit PDF in Word</strong> without performance issues.</p>
            <p>The benefits are immediate. Compressed files upload and download faster. They bypass restrictive email attachment limits. For web developers, using our tool to reduce image size (jpg/png/webp) leads to faster websites, improving user experience and SEO. By using our tool, you're not just saving space; you're making your digital life more efficient.</p>
          </div>
        </section>

        {/* Features List */}
        <section className="py-12 md:py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Packed with Powerful Features</h2>
              <p className="text-muted-foreground mt-2">Everything you need for fast, secure, and efficient file compression.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Simple Steps to Smaller Files</h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block"></div>
              <div className="space-y-16">
                {[
                  { icon: UploadCloud, title: "1. Upload Files", description: "Drag and drop your files or select them from your device." },
                  { icon: Search, title: "2. Choose Mode", description: "Select Lossless, High-Quality, or Maximum compression." },
                  { icon: Zap, title: "3. AI Compresses", description: "Our smart engine optimizes each file for the best size-to-quality ratio." },
                  { icon: Download, title: "4. Download Instantly", description: "Get your smaller files individually or as a single ZIP archive." },
                ].map((step, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
                     <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8">
                       {index % 2 === 0 && (
                         <div className="flex flex-col items-center md:items-end">
                            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                         </div>
                       )}
                     </div>
                     <div className="relative my-4 md:my-0">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground z-10 relative">
                            <step.icon className="h-8 w-8" />
                        </div>
                     </div>
                     <div className="md:w-1/2 flex justify-center md:justify-start md:pl-8">
                       {index % 2 !== 0 && (
                         <div className="flex flex-col items-center md:items-start">
                           <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                           <p className="text-muted-foreground">{step.description}</p>
                         </div>
                       )}
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-12 font-headline">Made for Everyone</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                    {useCases.map((useCase) => (
                        <div key={useCase.title} className="flex flex-col items-center">
                            <div className="p-4 bg-muted rounded-full mb-4">
                               <Users className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="font-semibold text-lg">{useCase.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        
        {/* Related Tools Section */}
        <section className="py-12 md:py-20">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">Related Tools</h2>
              <p className="text-muted-foreground mt-2">To improve productivity, try our other free tools:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="p-6 h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 border-border/80 group-hover:border-primary/50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-foreground">{tool.title}</h3>
                      <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-background border-t">
        <div className="container max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PDF2Word. A part of All2ools.com</p>
        </div>
      </footer>
    </div>
  );
}
