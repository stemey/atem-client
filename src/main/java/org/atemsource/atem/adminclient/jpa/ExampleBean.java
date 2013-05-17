package org.atemsource.atem.adminclient.jpa;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.atemsource.atem.api.attribute.annotation.Association;


@Entity
public class ExampleBean
{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	/**
	 * a number
	 */
	private int number;

	/**
	 * just a simple text
	 */
	@NotNull
	private String text;

	/**
	 * some associated thingies
	 */
	@OneToMany(targetEntity = ExampleThing.class,cascade=CascadeType.ALL)
	@Association(targetType = ExampleThing.class)
	private List<ExampleThing> things;

	public int getId()
	{
		return id;
	}

	public int getNumber()
	{
		return number;
	}

	public String getText()
	{
		return text;
	}

	public List<ExampleThing> getThings()
	{
		return things;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public void setNumber(int number)
	{
		this.number = number;
	}

	public void setText(String text)
	{
		this.text = text;
	}

	public void setThings(List<ExampleThing> things)
	{
		this.things = things;
	}
}
