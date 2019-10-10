import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from "@testing-library/react";
import Tags from "./Tags.jsx";
import React from "react";

jest.mock('../../utils/CookieUtil');

describe('Tags', () => {

    it('should return null when empty array is passed', () => {
        const onChangeSpy = jest.fn();
        const {container} = render(<Tags selectedTags={[]} onChange={onChangeSpy}/>);
        expect(container.querySelector('.tag')).toBeNull();
    });

    it('should return null when null is passed', () => {
        const onChangeSpy = jest.fn();
        const {container} = render(<Tags selectedTags={null} onChange={onChangeSpy}/>);
        expect(container.querySelector('.tag')).toBeNull();
    });

    it('should render the list of strings as individual tags', () => {
        const tags = [{label: 'One', id: '1'}, {label: 'Two', id: '2'}, {label: 'Three', id: '3'}];
        const onChangeSpy = jest.fn();
        const {container} = render(<Tags selectedTags={tags} onChange={onChangeSpy}/>);
        expect(container.querySelector('.tag').children.length).toBe(3);
        container.querySelectorAll('.tagLabel').forEach((tagLabel, ind) => expect(tags[ind].label).toBe(tagLabel.textContent));
    })

    it('should trigger onChange function on click of remove icon', () => {
        const tags = [{label: 'One', id: '1'}, {label: 'Two', id: '2'}, {label: 'Three', id: '3'}];
        const onChangeSpy = jest.fn();
        const {getByText} = render(<Tags selectedTags={tags} onChange={onChangeSpy}/>);
        fireEvent.click(getByText('One').nextSibling);
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

});

