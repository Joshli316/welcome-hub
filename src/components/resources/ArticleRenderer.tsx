import { ContentBlock } from '@/types/resource';

interface ArticleRendererProps {
  content: ContentBlock[];
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  return (
    <div className="prose-custom space-y-5">
      {content.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-foreground leading-relaxed">{block.text}</p>;

    case 'heading':
      return block.level === 2 ? (
        <h2 className="text-xl font-bold mt-8 mb-3 text-foreground">{block.text}</h2>
      ) : (
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">{block.text}</h3>
      );

    case 'list':
      return block.ordered ? (
        <ol className="list-decimal list-inside space-y-1.5 text-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc list-inside space-y-1.5 text-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      );

    case 'tip':
      return (
        <div className="bg-sage-50 border-l-4 border-sage-400 p-4 rounded-r-lg">
          <p className="text-sage-800 text-sm">
            <span className="font-semibold mr-1">💡</span>
            {block.text}
          </p>
        </div>
      );

    case 'warning':
      return (
        <div className="bg-primary-50 border-l-4 border-primary-400 p-4 rounded-r-lg">
          <p className="text-primary-900 text-sm">
            <span className="font-semibold mr-1">⚠️</span>
            {block.text}
          </p>
        </div>
      );

    case 'comparison':
      return (
        <div className="space-y-3">
          {block.title && <h4 className="font-semibold text-sm text-muted">{block.title}</h4>}
          <div className="grid gap-3">
            {block.items.map((item, i) => (
              <div key={i} className="bg-white border border-border rounded-lg p-4">
                <div className="font-semibold text-primary-700 mb-1">{item.label}</div>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'steps':
      return (
        <div className="space-y-4">
          {block.items.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <div className="flex-1 pt-0.5">
                <div className="font-semibold mb-0.5">{step.title}</div>
                <p className="text-sm text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
