import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import { Bold, Italic, Heading1, Heading2, Heading3, ImageIcon, List, Undo, Redo } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useSiteContent } from "@/contexts/SiteContentContext";

interface Props {
  content: string;
  onChange: (html: string) => void;
}

const ArticleEditor = ({ content, onChange }: Props) => {
  const { uploadImage } = useSiteContent();

  const editor = useEditor({
    extensions: [StarterKit, TiptapImage],
    content,
    onUpdate: ({ editor: e }) => { onChange(e.getHTML()); },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !editor) return;
      try {
        const url = await uploadImage(file, "article-images");
        editor.chain().focus().setImage({ src: url }).run();
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    };
    input.click();
  }, [editor, uploadImage]);

  if (!editor) return null;

  const ToolBtn = ({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button type="button" onClick={onClick}
      className={`p-1.5 rounded transition-colors ${active ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
      {children}
    </button>
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-2 bg-surface-container rounded-t-lg border border-outline-variant/30 border-b-0">
        <ToolBtn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={14} /></ToolBtn>
        <ToolBtn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={14} /></ToolBtn>
        <div className="w-px bg-outline-variant/30 mx-1" />
        <ToolBtn active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={14} /></ToolBtn>
        <ToolBtn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={14} /></ToolBtn>
        <ToolBtn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={14} /></ToolBtn>
        <div className="w-px bg-outline-variant/30 mx-1" />
        <ToolBtn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={14} /></ToolBtn>
        <ToolBtn onClick={addImage}><ImageIcon size={14} /></ToolBtn>
        <div className="w-px bg-outline-variant/30 mx-1" />
        <ToolBtn onClick={() => editor.chain().focus().undo().run()}><Undo size={14} /></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()}><Redo size={14} /></ToolBtn>
      </div>
      <div className="border border-outline-variant/30 rounded-b-lg bg-surface-container-low p-4 min-h-[200px] prose prose-invert prose-sm max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[180px] [&_img]:rounded-lg [&_img]:max-w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default ArticleEditor;
