import cN from '@/utils/classNameManager';

const GenresBadgesList = ({ genres, onClick, className }) => {
  if (!genres) return null;

  const items = Array.isArray(genres)
    ? genres
    : Object.entries(genres).map(([key, value]) => ({
        id: key,
        name: value
      }));

  const Tag = onClick ? 'button' : 'span';

  return (
    <ul className='flex gap-1 flex-wrap'>
      {items.map((g) => (
        <li key={g.id}>
          <Tag
            className={cN(
              'font-semibold badge badge-sm',
              onClick && 'cursor-pointer',
              typeof className === 'function' ? className(g.id) : className
            )}
            onClick={() => onClick?.(g.id)}
            {...(onClick && { type: 'button' })}
          >
            {g.name}
          </Tag>
        </li>
      ))}
    </ul>
  );
};

export default GenresBadgesList;
