package org.atemsource.atem.adminclient.example;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.atemsource.atem.api.attribute.annotation.Association;
import org.springframework.stereotype.Component;

@Component
public class ExampleBean {
	/**
	 * just a simple text
	 */
	@NotNull
	private String text;
	/**
	 * a number
	 */
	private int number;
	/**
	 * some associated thingies
	 */
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
