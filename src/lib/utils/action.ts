function isFocusable(element: HTMLElement)
{
    if(!element.focus)
        return false;
    if(element.hasAttribute("disabled"))
        return false;
    if(element.getAttribute("tabindex") != "-1")
        return false;
    return true;
}

export function enterNext(node: HTMLElement)
{
    function handleKeyDown(e: KeyboardEvent)
    {
        if(e.key != "Enter")
            return;

        e.preventDefault();

        const form = (e.target as HTMLElement).closest("form");
        if(!form)
            return;

        const elements = Array.from(form.elements) as HTMLElement[];
        const currentIdx = elements.indexOf(e.target as HTMLElement);

        for(let i = currentIdx + 1; i < elements.length; i++)
        {
            if(!isFocusable(elements[i]))
                continue;
            elements[i].focus();
            break;
        }
    }

    node.addEventListener("keydown", handleKeyDown);

    return {
        destroy()
        {
            node.removeEventListener("keydown", handleKeyDown);
        }
    };
}
