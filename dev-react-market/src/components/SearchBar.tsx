interface SearchBarProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  className,
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchBarProps) => {
  return (
    <div className={className}>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
