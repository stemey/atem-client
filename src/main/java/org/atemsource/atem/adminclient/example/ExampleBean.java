package org.atemsource.atem.adminclient.example;

import java.util.List;

import org.atemsource.atem.api.attribute.annotation.Association;
import org.springframework.stereotype.Component;

@Component
public class ExampleBean {
	private String text;
	private int number;
	@Association(targetType = ExampleThing.class)
	private List<ExampleThing> things;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public List<ExampleThing> getThings() {
		return things;
	}

	public void setThings(List<ExampleThing> things) {
		this.things = things;
	}
}
