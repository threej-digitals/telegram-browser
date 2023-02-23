export default function Dropdown({
  defaultValue,
  className,
  id,
  name,
  onChange,
  options,
}) {
  return (
    <select
      className={className}
      name={name}
      id={id}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {options.map((o) => (
        <option key={o.key} value={o.key}>
          {o.value}
        </option>
      ))}
    </select>
  );
}
